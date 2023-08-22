import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from 'flowbite-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { editWorkLogTimeValidationSchema } from '../../../lib/zod/validationSchema';
import { DailyClientWorkLogData, TimeRange } from '../types';
import { useEffect } from 'react';

export type EditModalProps = {
  openModal: string | undefined;
  setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>;
  editModalData: {yyyymm: Date, userId: number, date: number};
  recordItemText: string;
}

type FormValues = {
  [key: string]: string
}

type DefaultValues = {
  [key: string]: string;
}

const pattern = "(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]|24:00:00";

const EditModal: React.FC<EditModalProps> = ({
  openModal,
  setOpenModal,
  editModalData,
  recordItemText
}) => {
  // const defaultValues: DefaultValues = editModalData.workLogTime.reduce((acc, item, index) => {
  //   acc[`registeredStartTime${index + 1}`] = item.start.toString();
  //   acc[`registeredEndTime${index + 1}`] = item.end.toString();
  //   return acc;
  // }, {} as DefaultValues);

  useEffect(() => {
    (async() => {
      // const response: DailyClientWorkLogData = await fetchDateWorkLog(editModalData.userId, editModalData.yyyymm, editModalData.date);
    })();
  }, [])

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<FormValues>({
    // defaultValues,
    mode: "onChange",
    resolver: zodResolver(editWorkLogTimeValidationSchema)
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <>
      <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
        <Modal.Header>{recordItemText}の編集</Modal.Header>
        <Modal.Body>
          <div>
            <h4 className="text-base leading-relaxed text-gray-500 dark:text-gray-400">{editModalData.yyyymm.getFullYear()}年{editModalData.yyyymm.getMonth() + 1}月{editModalData.date}日</h4>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <div>
                <label>登録済みのデータを編集する</label>
                <div className="mt-2">
                  {/* {editModalData.workLogTime.map((time, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-betweens">
                        <input type="text" id={`registeredStartTime${index + 1}`} pattern={pattern} {...register(`registeredStartTime${index + 1}`)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
                        <span>〜</span>
                        <input type="text" id={`registeredEndTime${index + 1}`} pattern={pattern} {...register(`registeredEndTime${index + 1}`)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
                      </div>
                      <div>
                        <p className="text-red-500">{errors.registeredStartTime1 && errors.registeredStartTime1.message}</p>
                        <p className="text-red-500">{errors.registeredEndTime1 && errors.registeredEndTime1.message}</p>
                      </div>
                    </div>
                  ))} */}
                </div>
              </div>
              <div className="mt-8">
                <label>新規にデータを登録する</label>
                <div className="mt-2">
                  <div className="flex items-center justify-betweens">
                    <input type="text" id="editStartTime" pattern={pattern} {...register("editStartTime")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
                    <span>〜</span>
                    <input type="text" id="editEndTime" pattern={pattern} {...register("editEndTime")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
                  </div>
                  <div>
                    <p className="text-red-500">{errors.editStartTime && errors.editStartTime.message}</p>
                    <p className="text-red-500">{errors.editEndTime && errors.editEndTime.message}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button className="text-sm bg-orange-400 hover:bg-orange-700 focus:bg-orange-700 border-orange-400 rounded-lg text-white px-3 py-2">保存</button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setOpenModal(undefined)} className="text-sm bg-gray-500 hover:opacity-50 focus:opacity-50 rounded-lg text-white px-3 py-2">閉じる</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditModal;