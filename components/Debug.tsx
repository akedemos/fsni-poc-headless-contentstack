export const Debug = ({ value }: { value: unknown }) => {
  return <pre>{JSON.stringify(value, null, 2)}</pre>;
};
