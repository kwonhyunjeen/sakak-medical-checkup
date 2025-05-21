import type { Ref, RefCallback } from "react";
import { setRef } from "./setRef";

export function forkRef<Instance>(...refs: Array<Ref<Instance> | undefined>): RefCallback<Instance> {
  return (instance: Instance) => {
    for (const ref of refs) {
      setRef(ref, instance);
    }
  };
}
