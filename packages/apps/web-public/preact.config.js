import { resolve } from 'path';

export default function(config, env, helpers) {
    const css = helpers.getLoadersByName(config, 'css-loader')[0];
    css.loader.options.modules = false;

    // Use any `index` file, not just index.js
    config.resolve.alias['preact-cli-entrypoint'] = resolve(process.cwd(), 'src', 'index');

    config.resolve.modules.push(env.src);

    config.devServer.proxy = [
        {
            // proxy requests matching a pattern:
            path: '/api/v1',

            // where to proxy to:
            target: 'http://localhost:8000',
        },
    ];

    return config;
}
