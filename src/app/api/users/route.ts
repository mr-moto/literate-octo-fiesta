export async function GET(request: Request) {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, cause: '...' }, { status: 400 });
  }
}
