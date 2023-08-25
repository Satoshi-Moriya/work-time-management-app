import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from 'flowbite-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { createRegisterRecordItemLogValidationSchema } from '../../../lib/zod/validationSchema';
import { DailyClientRecordItemLog } from '../types';
import convertSecondsToTime from '../../../functions/convertSecondsToTime';

export type EditModalProps = {
  openModal: string | undefined;
  setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>;
  recordItem: { text: string; value: string; } | undefined;
  editModalData: {yyyymm: Date, date: number, recordItemLog: DailyClientRecordItemLog};
}

type FormValues = {
  editStartTime: string;
  editEndTime: string;
}

const pattern = "(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]|24:00:00";

const EditModal: React.FC<EditModalProps> = ({
  openModal,
  setOpenModal,
  recordItem,
  editModalData
}) => {
  const registerRecordItemLogValidationSchema = createRegisterRecordItemLogValidationSchema(editModalData.recordItemLog.recordItemLogTime);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(registerRecordItemLogValidationSchema)
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data.editStartTime, data.editEndTime);
    reset();
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
        <Modal.Header>{recordItem?.text}の編集</Modal.Header>
        <Modal.Body>
          <div>
            <h4 className="text-base leading-relaxed text-gray-500 dark:text-gray-400">{editModalData.yyyymm.getFullYear()}年{editModalData.yyyymm.getMonth() + 1}月{editModalData.date}日</h4>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              {editModalData.recordItemLog.recordItemLogTime.length !== 0 &&
                <div>
                  <label>登録済みの時間</label>
                  <div className="mt-3">
                    {editModalData.recordItemLog.recordItemLogTime.map((time, index) => (
                      <div key={index} className="[&:not(:first-child)]:mt-3">
                        <div className="flex items-center justify-betweens">
                          <p className="text-xl w-24 text-center">{convertSecondsToTime(time.start)}</p>
                          <span className="mx-3">〜</span>
                          <p className="text-xl w-24 text-center">{convertSecondsToTime(time.end)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
              <div className="mt-8">
                <label>新規にデータを登録する</label>
                <div className="mt-2">
                  <div className="flex items-center justify-betweens">
                    <input type="text" id="editStartTime" placeholder="00:00:00〜24:00:00" pattern={pattern} {...register("editStartTime")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
                    <span className="mx-3">〜</span>
                    <input type="text" id="editEndTime" placeholder="00:00:00〜24:00:00"  pattern={pattern} {...register("editEndTime")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
                  </div>
                  <div>
                    <p className="text-red-500">{errors.editStartTime && errors.editStartTime.message}</p>
                    <p className="text-red-500">{errors.editEndTime && errors.editEndTime.message}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button type="submit" className="text-sm bg-orange-400 hover:bg-orange-700 focus:bg-orange-700 border-orange-400 rounded-lg text-white px-3 py-2">保存</button>
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
            className="text-sm bg-gray-500 hover:opacity-50 focus:opacity-50 rounded-lg text-white px-3 py-2">
              閉じる
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditModal;