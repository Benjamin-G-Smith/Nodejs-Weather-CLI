import chalk from 'chalk';

const menus = {
  main: `
${chalk.greenBright('weather [command] <options>')}
  ${chalk.blueBright('now')} ................ show weather for now
  ${chalk.blueBright('forecast')} ........... show weather forecast
  ${chalk.blueBright('config')}.............. set API key, default city ID, default temperature units
  ${chalk.blueBright('version')} ............ show package version
  ${chalk.blueBright('help')} ............... show help menu for a command
`,

  now: `//...
        `,
  forecast: `//...
        `,
  config: `//...
        `,
}

export async function help(args) {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]
  console.log(menus[subCmd] || menus.main)
}