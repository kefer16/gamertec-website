export class RespuestaEntity<T> {
   constructor(
      public code: number = 0,
      public data: T | null = null,
      public error: ErrorEntity = new ErrorEntity("0", "")
   ) {}
}

export class ErrorEntity {
   code: string;
   message: string;

   constructor(code: string, message: string) {
      this.code = code;
      this.message = message;
   }
}
