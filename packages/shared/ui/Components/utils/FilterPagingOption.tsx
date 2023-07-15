export const FilterPagingOptions = (ctx: any) => {
  const {
    limit,
    offset,
    search,
    from,
    to,
    filters,
    order,
    minPrice,
    maxPrice,
    rating,
    studioId,
    city,
    state,
    serviceTypeId,
  } = ctx.query;
  const options = {
    limit: limit,
    offset: offset || 0,
    search: search ? search : "",
    from: from ? from : null,
    to: to ? to : null,
    filters: filters ? Number(filters) : null,
    order: order ? Number(order) : 2,
    serviceTypeId: serviceTypeId || null,
    minPrice: minPrice || null,
    maxPrice: maxPrice || null,
    rating: Number(rating) || null,
    studioId: studioId || null,
    city: city,
    state: state || null,
  };
  //
  return options;
};
