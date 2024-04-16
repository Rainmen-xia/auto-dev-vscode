import { SymbolId } from "../model/Namespace";
import { TextRange } from "../model/TextRange";

export class LocalDef {
	range: TextRange;
	symbolId: SymbolId | null;

	constructor(range: TextRange, symbolId: SymbolId | null) {
		this.range = range;
		this.symbolId = symbolId;
	}
}