// type dataType = {
//   no_of_page:number;
//   limit:number;
//   current_page:number;
//   previous?:number|null;
//   next?:number|null;
//   data:any[]
// };

export const current_page = 1
export const totalPage = 1
export const itemPerPage = 5
export const previousPage = (current_page > 1? current_page -1:null)
export const nextPage = (current_page < totalPage? current_page +1:null)

const pagination =  (data) => {
  totalPage = (data.length === 0?1:Math.ceil(data.length/itemPerPage))


  return
}

export { pagination }