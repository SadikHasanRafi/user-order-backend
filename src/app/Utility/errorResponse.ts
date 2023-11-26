// {
//     "success": false,
//     "message": "User not found",
//     "error": {
//         "code": 404,
//         "description": "User not found!"
//     }
// }

const errorMessage = (
    success: string,
    message: string,
    code: number,
    description: string
) => {
    return {
        success: success,
        message: message,
        error: {
            code: code,
            description: description
        }
    }
}


export default errorMessage