import NetInfo from "@react-native-community/netinfo";

export enum ApiStatus {
  Pure = "pure",
  Loading = "loading",
  Error = "error",
  Failure = "failure",
  Success = "success"
}

interface ApiResponse<T> {
  status: ApiStatus;
  data?: any;
  message?: string;
}

export const APIClient = {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url);

      if (response === null) {
        return { status: ApiStatus.Error, message: "Something went wrong" };
      }

      const data = await response.json();
      const status = response?.status;
      if (status === 200) {
        return { status: ApiStatus.Success, data, message: "Success" };
      }

      if (status === 500) {
        return { status: ApiStatus.Error, message: "Server error" };
      }
      return { status: ApiStatus.Failure, message: "Something went wrong" };
    } catch (error) {
      const isConnected = await NetInfo.fetch().then(
        (state) => state.isConnected
      );
      if (!isConnected) {
        return { status: ApiStatus.Failure, message: "No internet connection" };
      }
      if (error instanceof TypeError) {
        return { status: ApiStatus.Error, message: "Network error" };
      }

      return { status: ApiStatus.Failure, message: "Unknown error occured" };
    }
  },
  fetchData: async (page: number) => {
    const response = await fetch(
      `https://api.pokemontcg.io/v2/cards?pageSize=12&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Netowrk response was not ok");
    }
    const data = await response.json();
    return data;
  }
};
