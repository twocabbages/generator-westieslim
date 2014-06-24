<?php

use Phinx\Migration\AbstractMigration;

class <%= MigrateClassName %> extends AbstractMigration
{
    /**
     * Change Method.
     *
     * More information on this method is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-change-method
     *
     * Uncomment this method if you would like to use it.
     */


    /**
     * Migrate Up.
     */
    public function up()
    {
         $table = $this->table('<%= table_name %>');
                 $table
                    <% _.each(attrs, function(attr){ %>
                     ->addColumn('<%= attr.name %>', '<%= attr.type %>', array('limit' => <% if(attr.type == 'integer') { %>11<% }else{ %>255<% } %>,'default' => <% if(attr.type == 'integer') { %>0<% }else{ %>""<% } %>, "comment"=>"<%= attr.name %> column"))
                    <% }) %>
                     ->addColumn('created', 'timestamp',array("comment"=>"创建时间"))
                     ->create();
    }

    /**
     * Migrate Down.
     */
    public function down()
    {
        if ($this->hasTable('<%= table_name %>')) {
            $this->dropTable('<%= table_name %>');
        }

    }
}