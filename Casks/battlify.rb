cask "battlify" do
  version "0.8.1"
  sha256 "91eab64016d3b5072b15394ea6d55fbc53911d0eaebd53b134673078273a032d"

  url "https://github.com/broisnischal/battlify/releases/download/v#{version}/Battlify-#{version}.dmg"
  name "Battlify"
  desc "Menu bar battery saver and charge limiter for Apple Silicon Macs"
  homepage "https://github.com/broisnischal/battlify"

  depends_on macos: ">= :sonoma"
  depends_on arch: :arm64

  app "Battlify.app"
end
