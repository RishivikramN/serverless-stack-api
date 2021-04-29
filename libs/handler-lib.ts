import { Context, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export default function handler(lambda) {
    return async function (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
      let body, statusCode;
  
      try {
        body = await lambda(event, context);
        statusCode = 200;
      } catch (e) {
        body = { error: e.message };
        statusCode = 500;
      }

      return {
        statusCode,
        body: JSON.stringify(body),
      };
    };
  }