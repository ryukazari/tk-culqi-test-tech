import { getCardDetails } from "./services/getCardDetails";

export const handler = async (event: any): Promise<any> => {
  return await getCardDetails(event);
};
