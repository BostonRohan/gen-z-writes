// Stops the client from outputting a huge number of warnings during compilation.
#[allow(warnings, unused)]
mod prisma;
 
use prisma::PrismaClient;
use prisma_client_rust::NewClientError;
 
#[tokio::main]
async fn main() {
    let client: Result<PrismaClient, NewClientError> = PrismaClient::_builder().build().await;
    println!("hello world");
}