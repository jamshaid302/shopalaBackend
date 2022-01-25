exports.responseSchema = function(response) {
    try {
        if (response.message == "success") {
            return { status_code: 1, message:"Success", data: response.data};
        } else {
            return { status_code: 0, message:"Failed", data: response.data};
        }

    } catch (error) {
        return { status_code: 0, message:"Failed", data: error};
    }

}
