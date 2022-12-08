import { BaseResponseInterface } from "../interfaces/base";

export function BaseResponse(
  Element: React.ElementType,
  { data, loading, error }: BaseResponseInterface
) {
  return () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    return <Element {...data} />;
  };
}
