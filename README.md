# react-native-pokedex

Simple pokedex integration with react-native.

> [!NOTE]
> Check out the demo video: https://www.loom.com/share/39c04faa191342e1bf8382bb119aa32a

Bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli). Opted-out from Expo to check out the RN CLI.

Time invested _(approx)_: 10h

## Highlights

- [**New architecture**](https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here): React Native 76 has the new bridgeless architecture enabled by default.
- [**React navigation v7**](https://reactnavigation.org/docs/getting-started): it was recently launched ([blog post](https://reactnavigation.org/blog/2024/11/06/react-navigation-7.0)) and I wanted to try out the Static API.
- [**Flash list**](https://shopify.github.io/flash-list): really fast and performant list component from Shopify. <!-- maybe try WishList?  -->
- [**Recoil + MMKV store**](https://recoiljs.org/docs/introduction/getting-started): global state management using Recoil with [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) persistence.
- [**TanStack's Query**](https://tanstack.com/query/latest/docs/framework/react/react-native): AKA React Query as the data fetching library, consuming [PokeAPI](https://pokeapi.co).
- [**NativeWind**](https://www.nativewind.dev): tailwind CSS styling on React Native.
