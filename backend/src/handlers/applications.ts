import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
};

// Helper to create response with CORS headers
const response = (statusCode: number, body: string | object): APIGatewayProxyResult => ({
  statusCode,
  headers: corsHeaders,
  body: typeof body === 'string' ? body : JSON.stringify(body),
});

const handlePost = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return response(400, 'No body');
    }
    const id = crypto.randomUUID();
    const data = JSON.parse(event.body);
    const obj = { id, ...data };

    await docClient.send(new PutCommand({
      TableName: 'JobApplications',
      Item: obj,
    }));

    return response(200, { message: 'Success' });
  } catch (e) {
    return response(500, 'Dynamo Fail');
  }
};

const handleGet = async (): Promise<APIGatewayProxyResult> => {
  try {
    const command = new ScanCommand({
      TableName: 'JobApplications',
    });
    const result = await docClient.send(command);
    return response(200, { applications: result.Items });
  } catch (e) {
    return response(500, 'Dynamo Fail');
  }
};

const handleDelete = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.pathParameters?.id) {
      return response(400, 'No id provided');
    }
    const id = event.pathParameters.id;

    await docClient.send(new DeleteCommand({
      TableName: 'JobApplications',
      Key: { id },
    }));

    return response(200, { message: `Delete ${id} Successfully` });
  } catch (e) {
    return response(500, 'Dynamo Fail');
  }
};

const handlePut = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.pathParameters?.id) {
      return response(400, 'No id provided');
    }
    if (!event.body) {
      return response(400, 'No body');
    }

    const id = event.pathParameters.id;
    const body = JSON.parse(event.body);
    const obj = { id, ...body };

    await docClient.send(new PutCommand({
      TableName: 'JobApplications',
      Item: obj,
    }));

    return response(200, { message: `Updated ${id} successfully` });
  } catch (e) {
    return response(500, 'Dynamo Fail');
  }
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const method = event.httpMethod;
  console.log('Event:', JSON.stringify(event));

  // Handle preflight OPTIONS request
  if (method === 'OPTIONS') {
    return response(200, '');
  }

  switch (method) {
    case 'POST':
      return handlePost(event);
    case 'GET':
      return handleGet();
    case 'DELETE':
      return handleDelete(event);
    case 'PUT':
      return handlePut(event);
    default:
      return response(405, 'Method not allowed');
  }
};
