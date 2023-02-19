## CycloneR

A simple IDE for the Cyclone Programming Language.

## Installation

1. Install [node.js](https://nodejs.org/en/download/) (if not installed already)

2. Navigate to the folder
```bash
cd <path-to-cycloner>
```

3. Install the dependencies
```bash
npm install
```

4. Open CycloneR
```bash
npm start
```

## Usage

Copy the code into CycloneR and click the 'run' button to execute the code.

```cpp
/* A bouncing ball test */

option-trace=true;
machine Bouncing_Ball_v1{
    real x where x>=0; // position 
    real v; // velocity
    real t where t>=0; // time
    const real G = 9.81; // earth's gravitational force
    real c where c>=0 && c<=1; // constant (energy loss)
    
    normal start state Fall{
        x = x + v * t;
        v = v - G * t;
    }

    normal state Bounce{
        v = -c * v;
        x = 0;
    }

    trans {Fall -> Fall}
    trans {Fall -> Bounce where x==0 && v<=0;}
    trans {Bounce -> Fall}

    invariant inv {x>=0;}

    goal{
        check for 2,3,4,5 reach (Fall,Bounce)
    }
}

```

## License

[MIT](https://choosealicense.com/licenses/mit/)