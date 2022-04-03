export class ResponseFormatter {
  static format(response: any): any {
    if (response.errors == null) {
      response.errors = undefined;
    } else {
      if (response.errors[0]?.extensions?.exception?.status == 7829) {
        if (response.data == null) response.data = {};
        response.data[response.errors[0].path[0]] = {
          result: response.errors[0]?.extensions?.exception?.message,
          errorMessage:
            response.errors[0]?.extensions?.exception?.errorMessage == undefined
              ? null
              : response.errors[0]?.extensions?.exception?.errorMessage,
          data: null,
          __typename: null,
        };
        response.errors = undefined;
      }
    }
    return response;
  }
}
