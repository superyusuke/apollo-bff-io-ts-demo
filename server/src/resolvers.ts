import { Resolvers, Friend } from "src/types/generated/graphql";
import { ResponseIoTs } from "src/checkApiResponseType.test";

const friends: Friend[] = [{ name: "nakanishi", hobby: "translation" }, { name: "kihara", hobby: "techno" }];

export const resolvers: Resolvers = {
  Query: {
    friendsOK: () => {
      return friends;
    },
    // 型が違うのでエラーが出る
    // friendsOK: () => {
    //   return 'friends';
    // },

    // API からフェッチする値がどんな型になるかはコンパイル時にはわからないので、
    // 無理やり型をつけるしかないが、その型があっている保証はない
    friendsDame: async () => {
      const res: Friend[] = await dameGetJsonFromRemoteAPI();
      return res;
    }
  }
};

// Friend[] とは違う型の値を返す関数
// こういったことに起因するエラーを見つけることが TS のみではできない
export const dameGetJsonFromRemoteAPI = async (): Promise<any> => {
  return [{ name: "nakanishi", hobby: ["translation", "hiphop"] }];
};

export const okGetJsonFromRemoteAPI = async (): Promise<any> => {
  return [{ name: "nakanishi", hobby: "jazz" }];
};
