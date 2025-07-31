export const API_KEY ='AIzaSyBukL4_xhwjWjqjATYbHg6jIzO4Z-Y0dPY'

export const value_converter = (value) =>{
  if(value>1000000)
  {
    return Math.floor(value/1000000)+"M"
  }
  else if(value>1000)
  {
    return Math.floor(value/1000)+"K"
  }
  else
  {
    return value;
  }
}