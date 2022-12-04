export const parsePrice = (price: any) =>{
  if (!price || price?.length === 0) return 0;
  return price.toString().replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
