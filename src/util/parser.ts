export const parsePrice = (price) =>{
  if (!price || price?.length === 0) return 0;
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
