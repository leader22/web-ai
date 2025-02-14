import { models } from "./models";
import { TextModelType } from "./modeType";
import { Seq2SeqModel } from "./seq2seqModel";
import { TextFeatureExtractionModel } from "./featureExtractionModel";

export interface InitTextModelResult {
  model: TextModel;
  elapsed: number;
}

export class TextModel {
  static create = async (id: string, proxy = true): Promise<InitTextModelResult> => {
    for (const modelMetadata of models) {
      if (modelMetadata.id === id) {
        switch (modelMetadata.type) {
          case TextModelType.FeatureExtraction: {
            const model = new TextFeatureExtractionModel(modelMetadata);
            const elapsed = await model.init(proxy);
            return {
              model: model,
              elapsed: elapsed,
            };
          }
          case TextModelType.Seq2Seq: {
            const model = new Seq2SeqModel(modelMetadata);
            const elapsed = await model.init(proxy);
            return {
              model: model,
              elapsed: elapsed,
            };
          }
        }
      }
    }
    throw Error("there is no text model with specified id");
  };
}
