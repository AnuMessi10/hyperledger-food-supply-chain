import {request} from '../../Utilities/axiosUtils';
import {Food, FoodImageUploadResponse} from '../Food/@types';

class FoodModel {
  static createProduct = async (data: Food) => {
    try {
      await request({
        url: '/product/create',
        method: 'POST',
        data: data,
      });
    } catch (error) {
      throw error;
    }
  };

  static imgToCloudinary = async (data: FormData) => {
    const res = await request<FoodImageUploadResponse>({
      url: 'https://api.cloudinary.com/v1_1/foodsupplychain/image/upload',
      method: 'POST',
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  };

  static getAllProducts = async () => {
    const res = await request<Food[]>({
      url: '/product/get/all',
      method: 'GET',
    });
    return res;
  };
}

export default FoodModel;
