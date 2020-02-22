import * as t from "io-ts";
import { PathReporter } from "io-ts/lib/PathReporter";
import {
  dameGetJsonFromRemoteAPI,
  okGetJsonFromRemoteAPI
} from "src/resolvers";

// io-ts の validator を定義していく

// ts の以下と同じ
// type Friend = { name: string, hobby: string }
const Friend = t.type({
  name: t.string,
  hobby: t.string
});

// ts の以下と同じ
// type Friend = Friend[]
export const ResponseIoTs = t.array(Friend);

// io-ts の validator から TS の type を抽出する
export type ResponseIoTs = t.TypeOf<typeof ResponseIoTs>;

describe("api のテスト", () => {
  it("型間違え", async () => {
    const res = await dameGetJsonFromRemoteAPI();
    const valRes = ResponseIoTs.decode(res);
    console.log(PathReporter.report(valRes));
    expect(PathReporter.report(valRes)[0]).toEqual("No errors!");
    expect(2).toBe(3);
  });

  it("型あっている", async () => {
    const res = await okGetJsonFromRemoteAPI();
    const valRes = ResponseIoTs.decode(res);
    console.log(PathReporter.report(valRes));
    expect(PathReporter.report(valRes)[0]).toEqual("No errors!");
  });
});
