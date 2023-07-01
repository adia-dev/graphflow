type Props = {};

const ConnectedUsers = (_props: Props) => {
  const users = [
    {
      name: "Abdoulaye Dia",
      picture:
        "https://i.pinimg.com/564x/a6/54/86/a654864cb62bcf42d90f6e15e268775f.jpg",
    },
    {
      name: "ThePrimeAgen",
      picture:
        "https://i.pinimg.com/564x/a6/54/86/a654864cb62bcf42d90f6e15e268775f.jpg",
    },
    {
      name: "Linus Torvald",
      picture:
        "https://i.pinimg.com/564x/a6/54/86/a654864cb62bcf42d90f6e15e268775f.jpg",
    },
  ];

  const MAX_VISIBLE_CONNECTED_USERS = 1;

  return (
    <div className="flex -space-x-5 hover:space-x-1 items-center">
      {users.slice(0, MAX_VISIBLE_CONNECTED_USERS).map((user, i) => (
        <div
          key={i}
          className="bg-primary-500 text-white border border-primary-800 w-10 h-10 rounded-full overflow-hidden flex items-center justify-center brightness-75 hover:brightness-100 hover:scale-105 transition-all duration-150 ease-in-out"
        >
          {user.picture ? (
            <img src={user.picture} alt={user.name} />
          ) : (
            <span>{user.name.at(0)?.toUpperCase()}</span>
          )}
        </div>
      ))}
      {users.length > MAX_VISIBLE_CONNECTED_USERS && (
        <div className="group bg-primary-500 text-white border border-primary-800 w-10 h-10 rounded-full flex items-center justify-center brightness-75 hover:brightness-100 hover:scale-105 transition-all duration-150 ease-in-out relative">
          <span>+ {users.length - MAX_VISIBLE_CONNECTED_USERS}</span>
          <ul className="hidden group-hover:block absolute top-full mt-2 left-0 bg-primary-500 px-3 py-2 rounded-lg">
            {users.slice(MAX_VISIBLE_CONNECTED_USERS).map((user, i) => (
              <li key={i}>
                <p className="text-xs whitespace-nowrap">{user.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ConnectedUsers;
