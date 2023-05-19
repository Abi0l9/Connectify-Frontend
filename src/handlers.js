export const updateCache = (cache, query, newUpdate) => {
  const uniqByEmail = (arr) => {
    let seen = new Set();

    return arr?.filter((item) => {
      let k = item?.email;

      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ getVerifiedUsers }) => {
    return {
      getVerifiedUsers: uniqByEmail(
        getVerifiedUsers?.map((user) => {
          if (user.id === newUpdate.id) {
            return newUpdate;
          }
          return user;
        })
      ),
    };
  });
};
