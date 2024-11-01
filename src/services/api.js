
import axios from 'axios';


//supplier route

export const createSupplier = async (supplierData) => {
    try {
        const response = await axios.post('http://localhost:5001/api/supplier', supplierData);
        return response.data;
    } catch (error) {
        console.error('Error adding supplier:', error);
        throw error;
    }
};


export const getAllSupplier = async()=>{
    try {
        const res = await axios.get('http://localhost:5001/api/supplier')
       
        return res.data
    } catch (error) {
        console.error('Error adding supplier:', error);
        throw error;
    }
}

export const getASupplier = async(id)=>{
    try {
        const res = await axios.get(`http://localhost:5001/api/supplier/${id}`)
        console.log(res,"mome");
        return res.data
    } catch (error) {
        console.error('Error fetching a supplier:', error);
        throw error;
    }
  
}

export const updateASupplier = async(id,data)=>{
    console.log(data);
    
    try {
        const res = await axios.put(`http://localhost:5001/api/supplier/${id}`,data)
        console.log(res);
        return res
    } catch (error) {
        console.error('Error updating supplier:', error);
    }
}

export const deleteSupplier = async(id)=>{
    try {
        const res = await axios.patch(`http://localhost:5001/api/supplier/6721b1b122f66dbcf26067c5`)
        console.log(res);
    } catch (error) {
        
    }
}




//item route


export const getAllItem= async()=>{
    try {
        const res = await axios.get('http://localhost:5001/api/items')
        console.log(res,"HAI");
        
        return res.data
    } catch (error) {
        
    }

}

export const createItem = async(data)=>{
    console.log(data,"this is data");
    
   try {
     const res = await axios.post('http://localhost:5001/api/item',data)
   
     return res.data
     
   } catch (error) {
    
   }
}


//createpurchase order

export const createPurchaseOrder = async (data) => {
    const res = await axios.post('http://localhost:5001/api/purchaseOrder', data);
    return res.data;
  };



export const exportPurchaseOrder = async(id)=>{
    const res = await axios.get(`http://localhost:5001/api/purchaseOrder/${id}` )
       
     console.log(res);
     
    return res
}
  

