Arti Tor, is a project dedicated to re-implementing Tor in the Rust programming language. This undertaking promises not only to enhance the security and performance of Tor but also to pave the way for more modular and reusable privacy solutions.

Arti was oficially announced in [july 2021](https://blog.torproject.org/announcing-arti/), as a way to move Tor away from C, a programming language that, despite being present everywhere, makes it harder to build upon, because of its lack of high-level features that forces developers to write more code to keep Tor up to modern standards.

Another core motivation behind Arti is Rust’s reputation for safety and efficiency. Unlike C, the language in which Tor was originally written, Rust inherently prevents many common programming errors related to memory management. This is crucial for a project like Tor, where vulnerabilities can have serious implications for user privacy. By leveraging Rust’s robust safety features, Arti aims to build a more secure foundation for anonymous browsing.

Also, Arti is designed with modularity in mind. This means that its components can be more easily integrated into other applications, fostering innovation and expanding the reach of privacy-preserving technologies. Developers can reutilize Arti’s components in their projects, creating a ripple effect that strengthens the overall ecosystem of internet privacy tools.

This is not possible in Tor's C implementation, since modularity was not considered from the start, and the deep integration between the different parts of the program makes it impossible to "separate" and update them without breaking the program.

## Can I use it safely to protect my browsing?
Right now, [Arti 1.4.0](https://blog.torproject.org/arti_1_4_0_released/) can connect to the Tor network, bootstrap a
view of the Tor directory, and make anonymized connections over the network.
Althought it's still very young, Arti is now suitable for
actual use to anonymise connections.

However, there are still plenty of bugs to be squashed and unstable API's that might be updated or changed in the future.

Also, there are no binnaries ready to run at the moment, so if you really feel like using it, you need a Rust development environment to build Arti yourself.

After building and running the binary, Arti will open a
SOCKS proxy on port 9150

Wanna try? Set up your Rust development environment and type

`cargo build -p arti --release`

and then run the binary by typing

`./target/release/arti proxy`

After this, you can configure your applications to use the SOCKS proxy at localhost:9150. This is useful for routing traffic through the Tor network.

### A necessary warning
When using the default build options, the compiler will incorporate filesystem path information into the generated binary. If this path contains sensitive data, such as your username, you should take measures to prevent this. Refer to doc/safer-build.md for further guidance.
