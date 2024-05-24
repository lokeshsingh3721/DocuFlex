const Recent = ({
  name,
  last_edit,
  size,
}: {
  name: string;
  last_edit: string;
  size: string;
}) => {
  return (
    <tr className="flex justify-between">
      <td className="flex gap-2">
        <input type="checkbox" name="" id="" />
        <p>{name}</p>
      </td>
      <td>{last_edit}</td>
      <td>{size}</td>
      <td>:</td>
    </tr>
  );
};

export default Recent;
