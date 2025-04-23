export async function GET(request) {
    const token = request.cookies.get('admin_token');
    return Response.json({ token });
};