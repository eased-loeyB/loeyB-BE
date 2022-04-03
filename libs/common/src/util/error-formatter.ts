export class ErrorFormatter {
  static format(error: any): any {
    if (error.extensions?.exception?.status == 7830) {
      return {
        message: error.extensions?.exception?.message,
        status: 7830,
      };
    }
    if (error.extensions?.code === 'GRAPHQL_VALIDATION_FAILED') {
      return {
        message: error.message,
        status: 7831,
      };
    }
    return error;
  }
}
