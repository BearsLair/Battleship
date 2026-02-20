# Battleship Codebase Guide for AI Agents

## Project Overview

Battleship is a browser-based two-player game implementation (human vs CPU) using vanilla JavaScript. The architecture separates concerns into distinct modules: ship management, gameboard logic, player tracking, and DOM-based UI with a ship placement workflow.

## Architecture & Key Components

### Module Structure

- **`ships.js`**: Defines `Ship` class and `createFleet()` factory. Ships track `length` (health) and hit state. Fleet always contains 5 ships with fixed types: Carrier (Ca, 5), Battleship (Ba, 4), Cruiser (Cr, 3), Submarine (Su, 3), Destroyer (De, 2).
- **`gameboard.js`**: Core game logic with `Gameboard` and `Cell` classes. Manages a 100-cell 10x10 grid with coordinate system (A-J columns, 1-10 rows). `createBoard()` factory initializes the board.
- **`player.js`**: Simple `Player` class storing name and `isCPU` flag for CPU-controlled players.
- **`logic.js`**: Large UI orchestration file (713 lines) handling ship placement UI and game flow. Imports and coordinates all modules.
- **`index.html`**: Entry point loading `logic.js` as module.

### Critical Data Structures

- **Cell**: `{ id: "A1", x: 0, y: 0, cellHitOrMiss: false|"hit"|"miss", shipPresent: false|"Ca"|"Ba"|... }`
- **Ship**: `{ type: "Ca", length: 5, isSunk: false, hit(), isSunkFunc() }`
- **Placement Format** (used in `addShips()`): `{ start: "A1", orientation: "hor"|"ver", type: "Ca" }`

### Data Flow

1. Player enters name and places ships via UI (ship placement phase in `logic.js`)
2. Ship placements → `addShips(placementsArray)` → updates cell `shipPresent` properties
3. Attack phase: `receiveAttack(coordinate)` updates `cellHitOrMiss` and calls `ship.hit()`
4. Game end: `allshipsSunkFunc()` checks if all ships defeated

## Developer Workflows

### Testing

**CRITICAL**: `package.json` type must be changed between workflows:

```bash
# For testing (requires "type": "commonjs")
npm test              # Run all tests (Jest)
npm run test:watch   # Watch mode for TDD

# For browser (requires "type": "module")
# Open index.html in browser directly
```

⚠️ **Switching modules**: Edit `package.json` line `"type"` between `"commonjs"` (testing) and `"module"` (browser).

### Test Structure

- Jest with Babel transpilation (`babel.config.js` targets Node current)
- Test files: `ships.test.js`, `gameboard.test.js`, `player.test.js`
- Tests verify object properties, factory functions, and array operations
- Example: `createFleet()` returns array of 5 ships with proper type abbreviations and lengths

## Project Conventions & Patterns

### Naming

- Ship types use 2-letter abbreviations (Ca, Ba, Cr, Su, De) consistently across ships.js, gameboard.js, and tests
- Cell coordinates use `alphaNum` format (e.g., "A1", "J10") derived from `alphaCol` ["A"-"J"] and `numRow` ["1"-"10"] arrays
- DOM elements use class names like `playerShipsGrid`, `shipGridDiv` with inline style objects

### Common Patterns

- **Factory functions** (not constructors): `createFleet()`, `createBoard()` return initialized instances
- **Class methods with Func suffix**: `hit()` and `isSunkFunc()` in Ship; `receiveAttack()` and `allshipsSunkFunc()` in Gameboard (note inconsistent naming - `isSunkFunc` vs `receiveAttack`)
- **Grid coordinate lookup**: Find cells by iterating `shipsBoard` and matching `cell.id`
- **Inline style objects**: DOM elements use `Object.assign(element.style, {...})` instead of CSS classes for layout

### Validation Gaps

- No bounds checking on `addShips()` for board edges or ship overlaps (edge cases on rows/cols near J or 10)
- No validation that placements don't exceed grid boundaries before placing ships

## Integration Points & Dependencies

### External

- **Jest + Babel**: Testing requires `@babel/core`, `@babel/preset-env`, `babel-jest`, `jest` (^30.2.0)
- **Browser**: Vanilla JS, no external libraries; uses ES6 modules

### Cross-Module Communication

- `logic.js` imports and instantiates: `createBoard()`, `createFleet()`, `Player`
- `gameboard.js` depends on ship data via `ships` parameter in constructor
- DOM manipulation only in `logic.js` (UI isolation pattern)

### Git Context

- **Branch**: ShipPlacement (active feature branch)
- Ship placement phase UI still in development; battle phase logic exists but may be incomplete

## Writing Code in This Project

1. **Adding game logic**: Keep in `gameboard.js` (separate from UI)
2. **Adding ship features**: Modify `Ship` class or `createFleet()` in `ships.js`
3. **Adding tests**: Follow test pattern from existing files; verify with `npm test` after changing package.json to "commonjs"
4. **Adding UI**: Add to ship placement flow in `logic.js`; coordinate grid cells with existing alphaCol/numRow pattern
5. **Grid cell updates**: Always match "A1" format; use `shipsBoard` array iteration + `.id` matching for lookups

## Known Limitations & TODOs

- No AI logic implemented for CPU player yet
- Battle phase UI incomplete
- No input validation for ship placement boundaries
- Module type switching requirement between test/browser workflows is friction point
