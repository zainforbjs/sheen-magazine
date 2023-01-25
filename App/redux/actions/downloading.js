import { IS_DOWNLOADING} from 'const/account';


export const is_downloading = (step) => {
    return {
      type: IS_DOWNLOADING,
      payload: step,
    };
  };

