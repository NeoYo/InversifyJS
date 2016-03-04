///<reference path="../../typings/browser.d.ts" />

import { expect } from "chai";
import Binding from "../../src/bindings/binding";
import BindingType from "../../src/bindings/binding_type";
import BindingToSyntax from "../../src/syntax/binding_to_syntax";

describe("BindingToSyntax", () => {

    it("Should set its own properties correctly", () => {

        interface INinja {}
        let ninjaIdentifier = "INinja";

        let binding = new Binding<INinja>(ninjaIdentifier);
        let bindingToSyntax = new BindingToSyntax<INinja>(binding);

        // cast to any to be able to access private props
        let _bindingToSyntax: any = bindingToSyntax;

        expect(_bindingToSyntax._binding.runtimeIdentifier).eql(ninjaIdentifier);

    });

    it("Should be able to configure the type of a binding", () => {

        interface INinja {}
        class Ninja implements INinja {}
        let ninjaIdentifier = "INinja";

        let binding = new Binding<INinja>(ninjaIdentifier);
        let bindingToSyntax = new BindingToSyntax<INinja>(binding);

        expect(binding.type).eql(BindingType.Instance);

        bindingToSyntax.to(Ninja);
        expect(binding.type).eql(BindingType.Instance);

        bindingToSyntax.toValue(new Ninja());
        expect(binding.type).eql(BindingType.Value);

        bindingToSyntax.toConstructor(Ninja);
        expect(binding.type).eql(BindingType.Constructor);

        bindingToSyntax.toConstructor(Ninja);
        expect(binding.type).eql(BindingType.Constructor);

        bindingToSyntax.toFactory((context) => { return new Ninja(); });
        expect(binding.type).eql(BindingType.Factory);

    });

});