# EOS Testing experiments

The goal of this work was to check what testing platforms that exist for EOSIO contracts and to
explore the possibilities of zeus-cmd from LiquidApps after having touched it on the DAPP Network
Hackathon 2019.

## Testing frameworks found:

- [EOSFactory by Tokenika](https://eosfactory.io)
- [Infeos by Infinite X Labs](https://github.com/infiniteXLabs/infeos)
- [Zeus by LiquidApps](https://github.com/liquidapps-io/zeus-sdk)
- [EOSLime by LimeChain](https://github.com/LimeChain/eoslime)

### EOSFactory

This project is good but it seemed a bit over the top for the needs for VIGOR. Besides that it is
developed using Python, so it requires that the tests are built using it as well, which is a barrier
for the developers, as the Javascript tests are the de facto standard of the industry. Another
possible issue was that the project seemed a bit paused, as the last commits were from July and
there were Issues and PRs opened since August that were not closed by December, so it was not considered.

### Infeos

This project seemed interesting but it is kind of abandoned. There are bugs and PRs opened from
March on Github that were not closed by December, and the last commit was from March as well,
so a bit risky to consider.
Besides this the framework requires Docker for running a node, which is a limitation, and also
the test specs had more boilerplate code than required.

### Zeus

We had a touch on this project on the DAPP Network Hackathon and it seemed promising so I decided to
give it a try. Stripped down the project to remove all unneeded dependencies, and contributed with
a few PRs to the project as well.
It is a tool that we might definitely consider in the future if we decide to use DAPP Network, but
for now it seemed a bit complex and time consuming for day to day development, but it is a nice
tool to come back again when we need to build integration tests with all the contracts to build more
complete testing cases.
The test spec structure seemed that could be improved, as it is based only on eosjs, so I think that
an integration of EOSLime into zeus would probably make a lot of sense in the future.
You can check the [zeustest](zeustest) directory here on this repository if you want to give it a try...

### EOSLime

This was the tool that I think is the way to go for now, as it is actively maintained, simple,
straightforward to use and develop tests with it, just like Ethereum truffle but simpler and cleaner.
The team put a lot of effort into making it dead easy to write test specs, just like truffle for
Ethereum. One can deploy contracts, call actions as a function call in the spec, load rows from
tables with a fluent syntax and many helpers to assert with as well.
There is a working example in the [limetest](limetest) directory for you to check out if you want.

## Conclusions

I think that for now the way to go it with EOSLime. It is well maintained and the framework focus
seems to be the effective writing of test specs and simple running of the suite, which I think that's
exactly what we need for now. It just works and causes almost no friction on the development workflow.
In the future it might be awesome to have EOSLime integrated into Zeus, so that one can build a box
using it completely disconnected of the other boxes and then, build up a complete project using those
boxes and test it all integrated in the end. Some idea to push back to LiquidApps, so maybe they also
like it, and might integrate both platforms for the future! :)

Enjoy!

PRC
