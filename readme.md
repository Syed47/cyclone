## Cyclone IDE

**A minimal IDE for Cyclone.**

## Installation

1. Install [node.js](https://nodejs.org/en/download/) (if not installed already)

2. Clone/Download the repository and navigate to it
```bash
cd <path-to-cyclone>
```
3. Install the dependencies
```bash
npm install
```
4. Open Cyclone
```bash
npm start
```

## Usage
_Note: Cyclone requires [Java](https://www.java.com/en/download/) to run code (proceed if you have Java installed)._

Copy the code into Cyclone and click the 'run' button to execute the code.

_Note: If you are using MacOS, you need to allow MacOS to safely run libz3.dylib and libz3java.dylib. To do this, follow the instructions [here](https://support.apple.com/en-ie/HT202491)_

```cpp
graph G {
    start state S{}
    final state q1{}
    final state r1{}
    state q2{}
    state r2{}

    transition { S -> q1  on "a" }
    transition { S -> r1  on "b" }

    transition { q1 -> q1 on "a" }
    transition { q1 -> q2 on "b" }
    transition { q2 -> q1 on "a" }
    transition { q2 -> q2 on "b" }

    transition { r1 -> r1 on "b" }
    transition { r1 -> r2 on "a" }
    transition { r2 -> r1 on "b" }
    transition { r2 -> r2 on "a" }
  
    goal { enumerate for 6 condition (!(S -> r1)) }  
}
```

## Author

[Syed Baryalay](www.linkedin.com/in/syedakacodeninja)

## License

[MIT](https://choosealicense.com/licenses/mit/)
