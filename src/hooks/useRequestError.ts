const useRequestError = () => {
  return (code: number | undefined) => {
    switch (code) {
      case 401:
        return 'Данные запроса не валидны. Исправьте ошибку в параметрах запроса и повторите попытку.';

      default:
        return 'Произошла ошибка';
    }
  };
};

export default useRequestError;
