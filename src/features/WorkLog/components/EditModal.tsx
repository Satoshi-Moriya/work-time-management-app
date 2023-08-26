import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from 'flowbite-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { createRegisterRecordItemLogValidationSchema } from '../../../lib/zod/validationSchema';
import { DailyClientRecordItemLog, RecordItemLogTimeRange } from '../types';
import convertSecondsToTime from '../../../functions/convertSecondsToTime';
import axios from 'axios';
import { api } from '../../../lib/api-client/ApiClientProvider';
import { convertTimeToSeconds } from '../functions/convertTimeToSeconds';
import { useState } from 'react';
import Toast from '../../Toast/components/Toast';
import { convertToClientRecordItemLogList } from '../functions/convertToClientRecordItemLogList';

export type EditModalProps = {
  openModal: string | undefined;
  setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>;
  recordItem: { text: string; value: string; } | undefined;
  editModalData: {yyyymm: Date, date: number, recordItemLog: DailyClientRecordItemLog};
  setEditModalData: React.Dispatch<React.SetStateAction<{yyyymm: Date, date: number, recordItemLog: DailyClientRecordItemLog}>>;
  selectedMonthlyRecordItemLogs: DailyClientRecordItemLog[];
  setSelectedMonthlyRecordItemLogs: React.Dispatch<React.SetStateAction<DailyClientRecordItemLog[]>>;
}

type FormValues = {
  editStartTime: string;
  editEndTime: string;
}

const pattern = "(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]|24:00:00";

const padZero = (value: number) => {
  return value.toString().padStart(2, '0');
};

const EditModal: React.FC<EditModalProps> = ({
  openModal,
  setOpenModal,
  recordItem,
  editModalData,
  setEditModalData,
  selectedMonthlyRecordItemLogs,
  setSelectedMonthlyRecordItemLogs,
}) => {
  const [toast, setToast] = useState<{message: string | null, isSuccess: boolean | null }>({message: null, isSuccess: null});
  const modalRecordItemLogs = editModalData.recordItemLog.recordItemLogTime;
  const registerRecordItemLogValidationSchema = createRegisterRecordItemLogValidationSchema(modalRecordItemLogs);
  const hyphenFormatDate = `${editModalData.yyyymm.getFullYear()}-${padZero(editModalData.yyyymm.getMonth() + 1)}-${padZero(editModalData.date)}`;

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(registerRecordItemLogValidationSchema)
  });
  const onSubmit: SubmitHandler<FormValues> = async(data) => {
    try {
      const csrfToken = await axios.post("http://localhost:8080/csrf");
      const headers = {
        "Content-Type": "application/json;charset=utf8",
        "X-CSRF-TOKEN": csrfToken.data.token
      };
      const recordItemLogResponse = await api.post("/record-item-logs", {
        recordItemId: editModalData.recordItemLog.recordItemId,
        recordItemLogDate: hyphenFormatDate,
        recordItemLogStartTime: `${hyphenFormatDate} ${data.editStartTime}`,
        recordItemLogEndTime: `${hyphenFormatDate} ${data.editEndTime}`,
        recordItemLogSeconds: convertTimeToSeconds(data.editEndTime) - convertTimeToSeconds(data.editStartTime)
      }, {
        headers: headers
      })
      const recordItemLogsData = convertToClientRecordItemLogList(recordItemLogResponse.data);
      const updatedSelectedMonthlyRecordItemLogs = selectedMonthlyRecordItemLogs.map(item => {
        // recordItemLogsDataは配列だが、登録データは1つなので、レスポンスは必ずデータが1つなので、[0]でOK
        if (item.recordItemLogDate === recordItemLogsData[0].recordItemLogDate) {
          return {
            ...item,
            recordItemLogTime: [...item.recordItemLogTime, recordItemLogsData[0].recordItemLogTime],
            recordItemLogSumSeconds: item.recordItemLogSumSeconds + recordItemLogsData[0].recordItemLogSeconds
          };
        }
        return item;
      });
      const updateEditModalData = {
        ...editModalData,
        recordItemLog: {
          ...editModalData.recordItemLog,
          recordItemLogTime: [...editModalData.recordItemLog.recordItemLogTime, recordItemLogsData[0].recordItemLogTime],
          recordItemLogSumSeconds: editModalData.recordItemLog.recordItemLogSumSeconds + recordItemLogsData[0].recordItemLogSeconds
        }
      }
      setEditModalData(updateEditModalData);
      setSelectedMonthlyRecordItemLogs(updatedSelectedMonthlyRecordItemLogs)
      setOpenModal(undefined);
      setToast({message: "データの登録が完了しました。", isSuccess: true});
    } catch(error) {
      setToast({message: "予期せぬエラーが起こり、データの登録ができませんでした。", isSuccess: false});
    }
    reset();
  }

  const recordItemDeleteHandler = async(recordItemLogTime: RecordItemLogTimeRange) => {
    try {
      const deleteItemId = recordItemLogTime.recordItemLogId;
      const deleteItemSeconds = (recordItemLogTime.end - recordItemLogTime.start);

      const csrfToken = await axios.post("http://localhost:8080/csrf");
      const headers = {
        "Content-Type": "application/json;charset=utf-8",
        "X-CSRF-TOKEN": csrfToken.data.token
      };

      await api.delete(`/record-item-logs/${deleteItemId}`, {
        headers: headers
      });
      // modalの表示
      // 削除した時間をモーダルから消す
      editModalData.recordItemLog.recordItemLogTime = editModalData.recordItemLog.recordItemLogTime
        .filter(item => item.recordItemLogId !== deleteItemId);
      // 削除した時間分をその日の合計時間からひく
      editModalData.recordItemLog.recordItemLogSumSeconds =
        editModalData.recordItemLog.recordItemLogSumSeconds - deleteItemSeconds;
      const updateEditModalData = editModalData;
      setEditModalData(updateEditModalData)

      setToast({message: "登録済みデータが削除されました。", isSuccess: true});
    } catch(error) {
      setToast({message: "予期せぬエラーが発生し、登録済みデータを削除できませんでした。", isSuccess: false});
    }
  }

  return (
    <>
      <Modal
        show={openModal === 'default'}
        onClose={() => {
          setOpenModal(undefined);
          reset();
        }}
      >
        <Modal.Header className="items-center">{editModalData.yyyymm.getFullYear()}年{editModalData.yyyymm.getMonth() + 1}月{editModalData.date}日の{recordItem?.text}の編集</Modal.Header>
        <Modal.Body>
          <div>
            {modalRecordItemLogs.length !== 0 &&
              <div className="mb-5">
                <h4 className="font-semibold">登録済みの時間</h4>
                <div className="mt-3">
                  {modalRecordItemLogs.map((time, index) => (
                    <div key={index} className="[&:not(:first-child)]:mt-3 flex">
                      <div className="flex items-center justify-betweens">
                        <p className="text-l w-24 text-center">{convertSecondsToTime(time.start)}</p>
                        <span className="mx-3">〜</span>
                        <p className="text-l w-24 text-center">{convertSecondsToTime(time.end)}</p>
                      </div>
                      <div className="ml-3">
                        <button onClick={() => recordItemDeleteHandler(time)} className="text-sm bg-orange-400 hover:bg-orange-700 focus:bg-orange-700 border-orange-400 rounded-lg text-white font-bold px-2 py-1">削除</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h4 className="font-semibold">新規にデータを登録する</h4>
                <div className="mt-2">
                  <div className="flex items-center justify-betweens">
                    <div>
                      <label htmlFor="editStartTime">開始時間</label>
                      <input type="text" id="editStartTime" placeholder="00:00:00〜24:00:00" pattern={pattern} {...register("editStartTime")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
                    </div>
                    <span className="mx-3 mt-7">〜</span>
                    <div>
                      <label htmlFor="editEndTime">終了時間</label>
                      <input type="text" id="editEndTime" placeholder="00:00:00〜24:00:00"  pattern={pattern} {...register("editEndTime")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
                    </div>
                  </div>
                  <div>
                    <p className="text-red-500">{errors.editStartTime && errors.editStartTime.message}</p>
                    <p className="text-red-500">{errors.editEndTime && errors.editEndTime.message}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button type="submit" className="text-sm bg-orange-400 hover:bg-orange-700 focus:bg-orange-700 border-orange-400 rounded-lg font-bold text-white px-3 py-2">保存</button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => {
              setOpenModal(undefined);
              reset();
            }}
            className="text-sm bg-gray-500 hover:opacity-50 focus:opacity-50 rounded-lg font-bold text-white px-3 py-2">
              閉じる
          </button>
        </Modal.Footer>
      </Modal>
      {
        toast.isSuccess != null && (
          <Toast toast={toast} setToast={setToast} />
        )
      }
    </>
  )
}

export default EditModal;