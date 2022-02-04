import * as fs from 'fs';
import {
  CognitoIdentityProviderClient,
  ListUsersCommand,
  ListUsersCommandInput,
  UserType
} from '@aws-sdk/client-cognito-identity-provider';


export const backupUsers = async (cognitoIdentityProviderClient: CognitoIdentityProviderClient,
                                  userPoolId: string) => {
  const commandInput: ListUsersCommandInput = {
    UserPoolId: userPoolId
  };

  let users: UserType[] = [];

  try {
    const paginationCalls = async () => {

      const command = new ListUsersCommand(commandInput);

      const response = await cognitoIdentityProviderClient.send(command);
      // console.info(response);

      if (!response.Users) {
        return;
      }

      users.push(...response.Users)

      if (response.PaginationToken) {
        commandInput.PaginationToken = response.PaginationToken;

        await paginationCalls();
      }
    };

    await paginationCalls();

  } catch (error) {
    throw error; // to be catched by calling function
  }

  console.log(users.length)

  const json = JSON.stringify(users);

  fs.writeFile('users.json', json, function (err) {
    if (err) {
      console.log(err)
    }
  });

  return;
};
