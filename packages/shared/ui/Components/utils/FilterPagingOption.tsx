export const FilterPagingOptions = (ctx: any) => {
  // console.log({ ctx: ctx.query });

  const { limit, offset, search, from, to, filters, order } = ctx.query;
  const options = {
    limit: limit ? limit : 10,
    offset: offset ? offset : 0,
    search: search ? search : "",
    from: from ? from : null,
    to: to ? to : null,
    filters: filters ? filters : null,
    order: order ? order : null,
  };
  //   console.log({ options });
  return options;
};
