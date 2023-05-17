import {promises as fs} from 'node:fs'
import path from 'node:path'
// @ts-expect-error untyped.
import ConnectorPunctuation from '@unicode/unicode-14.0.0/General_Category/Connector_Punctuation/code-points.js'
// @ts-expect-error untyped.
import DashPunctuation from '@unicode/unicode-14.0.0/General_Category/Dash_Punctuation/code-points.js'
// @ts-expect-error untyped.
import ClosePunctuation from '@unicode/unicode-14.0.0/General_Category/Close_Punctuation/code-points.js'
// @ts-expect-error untyped.
import FinalPunctuation from '@unicode/unicode-14.0.0/General_Category/Final_Punctuation/code-points.js'
// @ts-expect-error untyped.
import InitialPunctuation from '@unicode/unicode-14.0.0/General_Category/Initial_Punctuation/code-points.js'
// @ts-expect-error untyped.
import OtherPunctuation from '@unicode/unicode-14.0.0/General_Category/Other_Punctuation/code-points.js'
// @ts-expect-error untyped.
import OpenPunctuation from '@unicode/unicode-14.0.0/General_Category/Open_Punctuation/code-points.js'
import {codes} from 'micromark-util-symbol/codes.js'
import regenerate from 'regenerate'

// To do: after TS update, use TLA
// eslint-disable-next-line unicorn/prefer-top-level-await
main()

async function main() {
  const pcAll = regenerate()
    .addRange(codes.exclamationMark, codes.slash)
    .addRange(codes.colon, codes.atSign)
    .addRange(codes.leftSquareBracket, codes.graveAccent)
    .addRange(codes.leftCurlyBrace, codes.tilde)
    .add(ConnectorPunctuation)
    .add(DashPunctuation)
    .add(ClosePunctuation)
    .add(FinalPunctuation)
    .add(InitialPunctuation)
    .add(OtherPunctuation)
    .add(OpenPunctuation)
    .valueOf()

  // Note: we don’t support astrals.
  const pc = regenerate()
    .add(pcAll.filter((d) => d <= 0xff_ff))
    .toRegExp()

  await fs.writeFile(
    path.join(
      'packages',
      'micromark-util-character',
      'dev',
      'lib',
      'unicode-punctuation-regex.js'
    ),
    [
      '// This module is generated by `script/`.',
      '//',
      '// CommonMark handles attention (emphasis, strong) markers based on what comes',
      '// before or after them.',
      '// One such difference is if those characters are Unicode punctuation.',
      '// This script is generated from the Unicode data.',
      'export const unicodePunctuationRegex = ' + pc,
      ''
    ].join('\n')
  )
}
