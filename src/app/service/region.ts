const base_url = 'https://keldibekov.online'

export const getRegions = async () => {
  const res = await fetch(`${base_url}/region`, {
    next: { tags: ['country_list'] },
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resdata = await res.json();
  return resdata.data;
};