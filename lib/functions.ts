
const getCloudinaryBlurUrl= (imageUrl: string): string =>{
  // Extract the base URL and path segments
  const baseUrl = imageUrl.split('/upload/')[0]
  const endUrl = imageUrl.split('/Japan_2023/')[1]

  // Insert transformation parameters before the first path segment
  const transformedPath = `w_100,q_auto,f_webp,e_blur:1000/Japan_2023/${endUrl}`;

  // Construct the transformed URL
  const transformedUrl = `${baseUrl}/upload/${transformedPath}`;

  return transformedUrl;
}


export { getCloudinaryBlurUrl }