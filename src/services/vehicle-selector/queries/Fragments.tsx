export const FRAGMENT_LEGACY_PAGINATION_CURSOR = `
fragment legacyPaginationCursor on LegacyPaginationCursor {
    currentPage
    perPage
    total
}
`;

export const FRAGMENT_UVDB_I18N = `
fragment uvdbI18n on UvdbI18n {
    pl {
        name
    }
    pt {
        name
    }
    ro {
        name
    }
}
`;
