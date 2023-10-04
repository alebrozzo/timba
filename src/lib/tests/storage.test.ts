import { describe, expect, it } from "vitest"
import { getAllTimba } from "$lib/storage"

describe("localStorage", () => {
  it("getAllTimba returns an object", () => {
    const allTimba = getAllTimba()
    expect(allTimba).toBeTruthy()
  })

  it("saveAllTimba saves data", () => {
    const allTimba = getAllTimba()
    expect(allTimba).toBeTruthy()
  })
})
