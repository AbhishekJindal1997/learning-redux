
import axios from "axios";
import * as actions from "../api";

const api = ({dispatch}) => next => async action =>{

    if (action.type !== actions.apiCallBegan.type)
      return next(action);
    
      next(action);
      const {url, method, data, onSucess, onError} = action.payload;
       
      try {
        const response = await  axios.request({
            baseURL:'http://localhost:9001/api',
            url,
            method,
            data
        });
        // general
        dispatch(actions.apiCallSucces(response.data));
        // specific
        if(onSucess)
         dispatch({type:onSucess,payload:response.data});
      } catch (error){
          // general
          dispatch(actions.apiCallFail(error));
          // specific
          if(onError){
            dispatch({type:onError, payload:error});
        }

      }
        
};
export default api;