const colors = [
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'blue' },
];

export const getColors = () => colors;

export const getColorById = (colorId: number) => {
  const colorCurent = colors.find(color => colorId === color.id);

  return colorCurent?.name;
};
