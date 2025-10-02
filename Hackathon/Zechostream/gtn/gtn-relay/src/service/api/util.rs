use tracing::info;

pub fn new_req_log(route: String) {
    info!("Received new request at {}", route);
}

pub fn new_res_log(route: String, response: String) {
    info!("Response ready at route {}: {:}", route, response);
}
